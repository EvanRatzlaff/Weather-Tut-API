window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempDescription = document.querySelector(".temp-description")
    let tempDegree = document.querySelector(".temp-degree")
    let locationTimeZone = document.querySelector(".location-timezone")
    let tempSection = document.querySelector('.temperature')
    let tempSpan = document.querySelector('.temperature span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {
            long = pos.coords.longitude
            lat = pos.coords.latitude
            const proxi = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxi}https://api.darksky.net/forecast/aaf957872911d407b47bab1b25592a9e/${lat},${long}`;
            
            fetch(api)
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //Set DOM Elems from API
                tempDegree.textContent = temperature
                tempDescription.textContent = summary
                locationTimeZone.textContent = data.timezone
                //Celsius formula
                let cel = (temperature - 32) * (5 / 9)
                //setting icon
                setIcons(icon, document.querySelector('.icon'))
                //change degree reading
                tempSection.addEventListener('click', () => {
                    if(tempSpan.textContent === "F"){
                        tempSpan.textContent = "C"
                        tempDegree.textContent = Math.floor(cel)
                    }
                    else{
                        tempSpan.textContent = "F"
                        tempDegree.textContent = temperature
                    }
                })

            })
        })
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "orange"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
})