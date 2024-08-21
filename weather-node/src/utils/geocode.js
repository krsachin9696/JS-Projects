const accessToken = "pk.eyJ1IjoianVoaTMiLCJhIjoiY2x6bDFvMXVsMHpjaTJrcjAxZ252N3gyOSJ9.Wqsmk5ZQlYk_dLxqE5ObUw"


// fetching data using async/await
async function getCoordinates(search_text) {
    try{
        const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${search_text}&access_token=${accessToken}&limit=1`)
        if (!response.ok){
            throw new Error(`${response.status}  ${response.statusText}` )
        }
        const data = await response.json()
        if (data.features.length === 0){
            throw new Error("Seems like no such location exists!")
        }
        else{
            const {longitude,latitude} = data.features[0].properties.coordinates
            return {
                latitude,
                longitude
            }
        }
    }
    catch(err){
        throw new Error(err)
    }
    
}


module.exports= getCoordinates