import { Hono } from 'hono'
import {Flipper} from '../models/flippers'
import {Marque} from '../models/marques'
import { isValidObjectId } from 'mongoose';


const api = new Hono().basePath('/flippers')


api.get('/', async (c) => {
    const allCrea = await Flipper.find({})
    return c.json(allCrea)
})

api.get('/:creaId', async (c)=>{
    const _id = c.req.param('creaId')

    if(isValidObjectId(_id)){
        const oneCrea = await Flipper.findOne({_id})
        return c.json(oneCrea)
    }
    return c.json({msg:'ObjectId malformed'},400)
})


api.post('/', async (c) => {
    const body = await c.req.json();
    const { marqueId, ...flipperData } = body;

    try {
        if (!isValidObjectId(marqueId)) {
            return c.json({ msg: 'Invalid marqueId' }, 400);
        }

        const existingMarque = await Marque.findById(marqueId);
        if (!existingMarque) {
            return c.json({ msg: 'Marque not found' }, 404);
        }

        const newFlipperData = {
            ...flipperData,
            marque: {
                nom: existingMarque.nom,
                logo: existingMarque.logo,
                description: existingMarque.description
            }
        };

        const newFlipper = new Flipper(newFlipperData);
        const savedFlipper = await newFlipper.save();

        return c.json(savedFlipper, 201);
    } catch (error: unknown) {
        return c.json({ error: (error as Error).message }, 400);
    }
});



api.put('/:creaId', async (c) => {
    const _id = c.req.param('creaId');
    const body = await c.req.json();

    try {
        if (!isValidObjectId(_id)) {
            return c.json({ msg: 'Invalid flipper ID' }, 400);
        }

        const updatedFlipper = await Flipper.findByIdAndUpdate(_id, body, { new: true });

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
            return c.json({ msg: 'Invalid flipper ID' }, 400);
        }

        const { categories, ...rest } = body;

        const updateQuery = {
            $addToSet: {
                categories: categories,
            },
            $set: { ...rest },
        };

        const updatedFlipper = await Flipper.findByIdAndUpdate(_id, updateQuery, { new: true });

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
    const tryToDelete = await Flipper.deleteOne({_id})
    const {deletedCount} = tryToDelete
    if(deletedCount){
        return c.json({msg:"DELETE done"})
    }
    return c.json({msg:"not found"},404)
    
})

export default api