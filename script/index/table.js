// get the required data from "Table.json" (temporary until multiple table update or @Huwng somehow becomes competent at JS developing
let shared_var = getSharedvar()
function tablereader() {
    data = json.parse(fs.readFileSync(`${shared_var.path.appData}/ScoreTable/Table.json`))
}
// write the data back to "Table.json"
function tablewriter(data) {
    fs.writeFileSync(`${shared_var.path.appData}/ScoreTable/Table.json`,data)
    console.log("write success")
}

function calcavgmarks(name) {
    let i=0, t=0
    if (data.name.type1marks.length != 0) {
        for (i in data.name.type1marks) {
            t += data.name.type1marks[i]
        }
    }    
    if (data.name.type2marks.length != 0) {
        for (i in data.name.type2marks) {
            t += data.name.type2marks[i]
        }
    }
    if (data.name.type3marks != null) {
        t += data.name.type3marks
        t = t/(data.name.type1marks.length + data.name.type2marks.length*2 + 3)
        t = +num.toFixed(1)
    } else {
        t = t/(data.name.type1marks.length + data.name.type2marks.length*2)
        t = +num.toFixed(1)
    }
    data.name.avgmarks = t
}
// below are just learning english w/@Huwng, don't mind that.
const subjects = ["Math", "Literature", "Physics", "Chemistry", "Biology", "ForeignLanguage", "History", "Geography", "CivicEducation", "ComputerScience", "NationalDefenseEducation"]
function calcTotalavg () {
    for (i in subjects) {
       t += data.subjects[i].avgmarks 
    }
    t = t/11
    data.Totalavg = +num.toFixed(1)
}
function calcrewards() {
    let nolessthan6 = true, nolessthan5 = true, nolessthan3 = true, nolessthan2 = true, rewards = ""
    for (i in subjects) {
        if (data.subjects[i].avgmarks < 6.5) {
            nolessthan6 = false
        } else if (data.subjects[i].avgmarks < 5) {
                nolessthan5 = false
            } else if (data.subjects[i].avgmarks < 3.5) {
                    nolessthan3 = false
                } else if (data.subjects[i].avgmarks < 2) {
                        nolessthan2 = false
                    }
    }
    if ((data.math.avgmarks >=8 || data.literature.avgmarks >=8) && (nolessthan6 = true) && (data.Totalavg >=8)) {
        rewards = "Good"
    } else if ((data.math.avgmarks >=6.5 || data.literature.avgmarks >=6.5) && (nolessthan5 = true) && (data.Totalavg >=6.5)) {
            rewards = "Mild"
        } else if ((data.math.avgmarks >=5 || data.literature.avgmarks >=5) && (nolessthan3 = true) && (data.Totalavg >=5)) {
                rewards = "Medium"
            } else if ((nolessthan2 = true) && (data.Totalavg >=3)) {
                    rewards = "Bad"
                } else {
                    rewards = "Failed"
                 }
    return rewards                 
}