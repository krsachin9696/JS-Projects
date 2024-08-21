// this file will be loaded with index.hbs and works as client side code executed with html files

const messageOne = document.querySelector("#msg1")
const messageTwo = document.querySelector("#msg2")

// function which gets weather information
const displayWeatherInfo = (address) =>{
    fetch(`http://localhost:3000/weather?address=${address}`)
    .then(response=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
        if(!data.temparature){
            messageOne.textContent = data.message
            messageTwo.textContent = ""
        }
        else{
            messageOne.textContent = data.temparature
            messageTwo.textContent = data.description
        }

    })
    .catch((err)=>{
        messageOne.textContent = err
    })
}


const weatherForm = document.querySelector("form")

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageTwo.textContent = "Loading Weather information"
    messageOne.textContent = ""
    const address = document.querySelector("input").value
    console.log(address)
    displayWeatherInfo(address)
})