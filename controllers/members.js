const fs = require('fs')
const data = require("../data.json")
const { age, date } = require('../util')

exports.index = function(req, res){
    return res.render("members/index", { members: data.members })
}

//show
exports.show = function(req, res) {
    //buscando o instrutor por id
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return id == member.id
    })

    if (!foundMember) return res.send("Instrutor não encontrado")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }



    return res.render("members/show", { member })
}

//create
exports.create = function(req, res){
    return res.render("members/create")
}

exports.post = function(req, res) {

        const keys = Object.keys(req.body)
    
        for ( key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos!')
            }
        }
        let {avatar_url, 
            birth, 
            name, 
            email, 
            gender,
            weight,
            height
        } = req.body

        birth = Date.parse(req.body.birth)
        
        let id = 1
        const lastMember = data.members[data.members.length - 1]

        if (lastMember) {
            id = lastMember.id + 1
        }

        
        
        data.members.push({
            id,
            avatar_url,
            birth, 
            name, 
            email, 
            gender,
            weight,
            height

        })

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Write file error")

            return res.redirect("/members")
        })
    
        // return res.send(req.body)
    }

//update
exports.edit = function(req, res) {
    //buscando o instrutor por id
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Instrutor não encontrado")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', { member })
}

//put
exports.put = function(req, res) {
        //buscando o instrutor por id
        const { id } = req.body
        let index = 0

        const foundMember = data.members.find(function(member, foundIndex){ //usando o foundindex para localizar o instrutor
            if (id == member.id) {
                index = foundIndex
                return true
            }
        })
    
        if (!foundMember) return res.send("Instrutor não encontrado")

        const member = {
            ...foundMember,
            ...req.body,
            birth: Date.parse(req.body.birth),
            id: Number(req.body.id)
        }

        data.members[index] = member

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("Write error!")

            return res.redirect(`/members/${id}`)
        })
}

//delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/members")
    })

}
