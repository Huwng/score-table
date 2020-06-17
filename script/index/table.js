// get the required data from "Table.json" (temporary until multiple table update)
function tablereader() {
    data = json.parse(fs.readFileSync(`${global['shared'].path.appData}/ScoreTable/Table.json`))
}
// write the data back to "Table.json"
function tablewriter(data) {
    fs.writeFileSync(`${global['shared'].path.appData}/ScoreTable/Table.json`,data)
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
const subjects = ["Math", "Literature", "Physics", "Chemistry", "Biology", "ForeignLanguage", "History", "Geography", "CivicEducation", "ComputerScience", "NationalDefenseEducation"]
function calcTotalavg () {
    for (i in subjects) {
       t += data.subjects[i].avgmarks 
    }
    t = t/11
    data.Totalavg = +num.toFixed(1)
}
function calcrewards() {
    for (i in subjects) {
        if (data.subjects[i].avgmarks < 6.5 ) {}
    }
    if ((data.math.avgmarks >=8 || data.literature.avgmarks >=8) && (something = true) ) {
        rewards = "Good"
    } 
}