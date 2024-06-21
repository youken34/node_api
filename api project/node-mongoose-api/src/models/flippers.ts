import { Schema, model } from 'mongoose';
import { IMarque, marqueSchema } from './marques';

interface IFeatures {
    releaseDate: Date;
    moreInfo: string;
    phoneNumber: string;
}

interface IProduct {
    title: string;
    price: number;
    état: string;
    contactInfo: string;
    features: IFeatures;
    marque: IMarque; 
    notes?: string;
}

const featuresSchema = new Schema<IFeatures>({
    releaseDate: { type: Date, required: true },
    moreInfo: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

const productSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    état: { type: String, required: true },
    contactInfo: { type: String, required: true },
    features: { type: featuresSchema, required: true },
    marque: { type: marqueSchema, required: true }, 
    notes: { type: String },
});

const Flipper = model<IProduct>('Product', productSchema);

export { Flipper };
