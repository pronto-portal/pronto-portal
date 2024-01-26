import type { NextApiRequest, NextApiResponse } from 'next';
import { Address } from '../../../types/ObjectTypes';
import { places } from '../../../utils/googleapis';

const GetPlacesPrediction = (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>((resolve) => {
        if (!req.body.text) {
            res.status(200).json([]);
            resolve();
            return;
        }

        places
            .searchText(
                {
                    requestBody: {
                        textQuery: req.body.text,
                    },
                    fields: 'places.addressComponents',
                },
                {
                    headers: {
                        'X-Goog-FieldMask': 'places.addressComponents', //'addressComponents,formattedAddress',
                        Referer: process.env.NODE_ENV === 'production' ? 'https://prontotranslationservices.com' : 'http://localhost:3000',
                    },
                }
            )
            .then((placesRes) => {
                const placesData =
                    placesRes.data.places?.map((place) => {
                        const street_number = place.addressComponents?.find((component) => component.types?.includes('street_number'))?.shortText || '';
                        const route = place.addressComponents?.find((component) => component.types?.includes('route'))?.shortText || '';
                        const city =
                            place.addressComponents?.find((component) => component.types?.includes('locality') || component.types?.includes('sublocality'))
                                ?.shortText || '';
                        const state = place.addressComponents?.find((component) => component.types?.includes('administrative_area_level_1'))?.shortText || '';
                        const zipCode = place.addressComponents?.find((component) => component.types?.includes('postal_code'))?.shortText || '';

                        const address: Partial<Address> = {
                            address1: `${street_number.trim()} ${route.trim()}`.trim(),
                            address2: '',
                            city,
                            state,
                            zipCode,
                        };
                        return address;
                    }) || [];
                res.status(200).json(placesData);
                resolve();
            })
            .catch((err) => {
                console.log('placesData err', err);
                res.status(200).json([]);
                resolve();
            });
    });
};

export default GetPlacesPrediction;
