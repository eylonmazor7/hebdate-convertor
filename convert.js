function start(){
    let date = document.getElementById("date")
    let button = document.getElementById("subButton")
    button.addEventListener('click', convertDate)

    function convertDate(){
        let fullDate =  date.value

        if(fullDate === "")
            return

        if(!checkDate(fullDate))
            return //if bad date

        let basicUrl = "https://www.hebcal.com/converter?cfg=json&gy="+ fullDate.substring(0,4) +
           "&gm=" + fullDate.substring(5,7) +"&gd=" + fullDate.substring(8,10)+"&g2h=0"

        fetch(basicUrl).then(status).then(json)
            .then(function(response){
                if(response.error != null)
                    alert("not a valid date")
                else {
                document.getElementById("hebDate").style.display = 'block'
                document.getElementById("hebDate").innerHTML = "the hebrew date is:     " + response.hebrew +"  ."
                return
                }
            })
            .catch(err => (
                alert("not a valid date")));
    }

    function checkDate(date){
        flag = true
        if(date.length !== 10)
            flag = false

        let ye = parseInt(date.substring(0,4))
        let mo = parseInt(date.substring(5,7))
        let da = parseInt(date.substring(8,10))

        if(ye < 1900 || mo < 0 || mo > 12 || da < 0 || da > 32)
            flag = false

        if(!flag)
            alert("not a valid date")

        return flag
    }

    //check if the response status is proper. if not - send Error;
    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    //convert the response to json object
    function json(response) {
        return response.json()
    }
}
