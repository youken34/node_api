import { Hono } from 'hono'
import {Marque} from '../models/marques'
import { isValidObjectId } from 'mongoose'

const api = new Hono().basePath('/marques')


api.get('/', async (c) => {
    const allCrea = await Marque.find({})
    return c.json(allCrea)
})

api.get('/:creaId', async (c)=>{
    const _id = c.req.param('creaId')

    if(isValidObjectId(_id)){
        const oneCrea = await Marque.findOne({_id})
        return c.json(oneCrea)
    }
    return c.json({msg:'ObjectId malformed'},400)
})



api.post('/',async (c)=>{
    const body = await c.req.json()
    try {
        const newCrea  = new Marque(body)
        const saveCrea = await newCrea.save()
        return c.json(saveCrea, 201)
    } catch (error:unknown) {
        return c.json(error._message,400)
    }
})

api.put('/:creaId', async (c) => {
    const _id = c.req.param('creaId');
    const body = await c.req.json();

    try {
        if (!isValidObjectId(_id)) {
            return c.json({ msg: 'Invalid Marque ID' }, 400);
        }

        const updatedFlipper = await Marque.findByIdAndUpdate(_id, body, { new: true });

        if (!updatedFlipper) {
            return c.json({ msg: 'Flipper not found' }, 404);
        }

        return c.json(updatedFlipper, 200);
    } catch (error: unknown) {
        return c.json({ error: (error as Error).message }, 400);
    }
});

api.patch('/:creaId', async (c) => {
    const _id = c.req.param('creaId');
    const body = await c.req.json();

    try {
        if (!isValidObjectId(_id)) {
            return c.json({ msg: 'Invalid Marque ID' }, 400);
        }

        const { categories, ...rest } = body;

        const updateQuery = {
            $addToSet: {
                categories: categories,
            },
            $set: { ...rest },
        };

        const updatedFlipper = await Marque.findByIdAndUpdate(_id, updateQuery, { new: true });

        if (!updatedFlipper) {
            return c.json({ msg: 'Flipper not found' }, 404);
        }

        return c.json(updatedFlipper, 200);
    } catch (error: unknown) {
        return c.json({ error: (error as Error).message }, 400);
    }
});


api.delete('/:creaId',async (c)=>{
    const _id  = c.req.param('creaId')
    const tryToDelete = await Marque.deleteOne({_id})
    const {deletedCount} = tryToDelete
    if(deletedCount){
        return c.json({msg:"DELETE done"})
    }
    return c.json({msg:"not found"},404)
    
})

export default api