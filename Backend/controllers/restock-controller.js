// Restock controller to retock medications that are low in stock
// Aaron Leung
const mongoUtil = require("../mongoUtil")

const restockOrder = async (req, res) => {
    // Extract user inputs and store into the following variables
    const { id, name, manufactor, quantity } = req.body
    const database = mongoUtil.getDB()
    const query = { id: id }

    let medications = await database.collection("medications")
    let medication = await medications.findOne(query)
    
    // check if medication is in database, if not then insert into database
    if (!medication) {
        const doc = { id, name, manufactor, stock: +quantity }
        await medications.insertOne(doc)
        medication = await medications.findOne(query)
        res.json({
            message: "Medication successully added!",
            medication: medication,
        })
        return
    } else {
        const update = {
            $inc: {
                stock: +quantity,
            },
        }
        await medications.updateOne(query, update)
        medication = await medications.findOne(query)
        res.json({
            message: "Medication successully updated!",
            medication: medication,
        })
    }
}

exports.restockOrder = restockOrder
