const express = require("express");
const { getOrders,getOrderById,addOrUpdateOrder,deleteOrder} = require("./dynamodb");
const app = express();
app.use(express.json());

app.get('/' , (req, res) => {
    res.send('Hello word');
});

app.get('/orders' , async (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      const orders = await getOrders();
      res.json(orders);
    } catch (error) {
        console.error(err);
        res.status(500).json({err: 'Something went wrong'});
    }
});

app.get('/orders/:id' , async (req, res) => {
    const id = req.params.id;
    try {
      const orders = await getOrderById(id);
      res.json(orders);
    } catch (error) {
        console.error(err);
        res.status(500).json({err: 'Something went wrong'});
    }
});

app.post('/orders/' , async (req, res) => {
    const order = req.body;
    try {
      const neworder = await addOrUpdateOrder(order);
      res.json(neworder);
    } catch (error) {
        console.error(err);
        res.status(500).json({err: 'Something went wrong'});
    }
});

app.put('/orders/:id' , async (req, res) => {
    const order = req.body;
    const {id} = req.params;
    order.id = id;
    try {
      const updatedOrder = await addOrUpdateOrder(order);
      res.json(updatedOrder);
    } catch (error) {
        console.error(err);
        res.status(500).json({err: 'Something went wrong'});
    }
});

app.delete('/orders/:id' , async (req, res) => {
    const {id} = req.params;
    try {
      res.json(await deleteOrder(id));
    } catch (error) {
        console.error(err);
        res.status(500).json({err: 'Something went wrong'});
    }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening on port 3000');
});
