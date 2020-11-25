module.exports = {
    age: function(timestamp){
        
            const today = new Date()
            const birthDate = new Date(timestamp)
    
            let age = today.getFullYear() - birthDate.getFullYear()
            const month = today.getMonth() - birthDate.getMonth()
    
            if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate() ){
                    age--
                }
                return age
    },
    date: function(timestamp) {
        const date = new Date(timestamp)
        
        //Formato ano -> yyyy
        const year = date.getUTCFullYear()

        //Formato mês -> mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) //+ 1 pois o mês vai de 0 a 11
        

        //Formato dia -> dd
        const day = `0${date.getUTCDate()}`.slice(-2) // Trás data de 1 a 31

        return `${year}-${month}-${day}`


    }
}
