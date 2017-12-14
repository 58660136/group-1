const request = require('supertest')
const app = require('../server')


describe('GET /contacts', () =>{
    it('return list contacts', (done) => {
        request(app).get('/contacts')
            .expect(200)
            .then((res) => {
                let contacts = res.body
                expect(contacts instanceof Array).toBeTruthy()
                
                let contact = contacts[0]
                
                expect(contact.id).toHaveProperty
                expect(contact.id).toBe(0)
                expect(contact.name).toHaveProperty
                expect(contact.name).toBe('Ned Stark')
                expect(contact.email).toHaveProperty
                expect(contact.email).toBe('ned@winterfell.com')
                expect(contact.phone).toHaveProperty
                expect(contact.phone).toBe('123-456-7890')
                expect(contact.url).toHaveProperty
                expect(contact.url).toBe('www.google.com')
                expect(contact.notes).toHaveProperty
                expect(contact.notes).toBe('Winter is coming.')
                done() //สั่งหยุดเมื่อtestเสร็จแล้ว

            })
            
    })
})

describe("GET /contacts/:id", () => {
    it("return contact id = 0 if(get id = 0)", (done) => {
        request(app).get("/contacts/0")
            .expect(200)
            .then((res) => {
                let contact = res.body
                //เช็ค contact ที่ return เป็น id = 0 หรือเปล่า
                expect(contact.id).toEqual(0)

                expect(contact).toEqual({id: 0, name: 'Ned Stark', email: 'ned@winterfell.com', phone: '123-456-7890', url: 'www.google.com', notes: 'Winter is coming.'})
                done() //สั่งหยุดเมื่อtestเสร็จแล้ว
            })
    })
})

describe("POST /contacts", () => {
    it(`return http status "201" and send contact
        (if send contact {name,email,phone,url,notes}) /contacts method post`, (done) =>{
        let sendContact = {
                name: 'IT', 
                email: 'it@buu.ac.th', 
                phone: '123-456-7890', 
                url: 'www.google.com', 
                notes: 'information'
            }
        request(app).post("/contacts")
            .send(sendContact)
            .expect(201)
            .then((res) => {
                let reciveContact = res.body
                expect(reciveContact).toHaveProperty("id",12)
                expect(reciveContact).toHaveProperty("name",sendContact.name)
                expect(reciveContact).toHaveProperty("email",sendContact.email)
                expect(reciveContact).toHaveProperty("phone",sendContact.phone)
                expect(reciveContact).toHaveProperty("url",sendContact.url)
                expect(reciveContact).toHaveProperty("notes",sendContact.notes)
                done()
            })
        })
})

describe("PUT /contacts/:id",() => {
    const sendContact = {
        id : 15,
        name: 'CS', 
        email: 'cs@buu.ac.th', 
        phone: '123-456-7890', 
        url: 'www.google.com', 
        notes: 'Computer Science'
    }
    it(`return http status 200 and send contact update contact id = 15`,(done) => {
        request(app).put("/contacts/15")
            .send(sendContact)
            .expect(200)
            .then((res) => {
                done()
            })

    })
    it(`update contact id = 15 to send contact`,(done)=>{
        request(app).get("/contacts/15")
            .expect(200)
            .then((res) => {
                let contact = res.body
                expect(contact).toEqual(sendContact) //เช็คค่า contact นั้น update แล้ว
                done()
            })
    })
    
})

describe(`delete /contacts/:id`,() => {
    it(`return http status 204 and delete contacts id = 5
    and check id = 5 is null ?`,(done) => {
        request(app).delete("/contacts/5")
            .expect(204)
            .then((res) => {
                done()
            })

        request(app).get("/contacts/5")
            .expect(200)
            .then((res) => {
                let contact = res.body
                expect(contact).toBe("")
                done()
            })
    })
})
