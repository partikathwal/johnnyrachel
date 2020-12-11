const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const ANSWERS = [
    "",
    "Proverbs1:6",
    "prov17:17",
    "2ndCorin1:3,4",
    "12",
    "2Peter3:13",
    "4_12ec"
]

const URLS = [
    "",
    "o8nrw4fey",
    "govw9ubeh",
    "so8b1cs89",
    "hsv9pnru0",
    "ea34cvysv",
    "o8nrw5fey",
    "vrsy7sui3",
]



app.get("/:id", (req, res) => {
    const id = req.params.id;
    const index = URLS.indexOf(id);
    if(index === -1){
        //non-existent endpoint
        return res.send(getPage(1));
    }

    if(id === URLS[7]){
        if(req.query.theEnd === 'false'){
            return res.send(getPage(8));
        }else
        if(req.query.theEnd === 'true'){
            return res.send(getPage(7));
        }else{
            return res.redirect(`/${URLS[7]}?theEnd=true`);
        }
    }

    return res.send(getPage(index));
})


app.post("/api/:id", (req, res) => {
    const id = req.params.id;
    const index = URLS.indexOf(id);
    if(index === -1 || index === 7){
        //non-existent endpoint
        res.json({
            success: false
        });
        return;
    }

    const answer = req.body.answer;

    if(typeof answer === "string" && answer.trim() === ANSWERS[index]){
        res.json({
            success: true,
            nextURL: URLS[index + 1]
        })
        return;
    }else{
        res.json({
            success: false
        })
        return;
    }
})



app.listen( process.env.PORT || 3000);

//======

function getPage(num){
    let page = fs.readFileSync(`./page_${num}.html`, {encoding: "utf-8"});
        page = page.replace("{{endpoint}}", URLS[num]);
    return page;
}