import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const GetPremium = () => {
    const plans = {
        name: "Pro",
        price: "19.99",
        features: ["Access to tutorials", "Access to previous premium content", "Priority support", "Get my brushes for PS and CSP"],
    }

    return (
        <div className="container mx-auto py-12">
            <div className="justify-center flex flex-wrap">
                <div className="relative">
                    <Image src={"/assets/card_premium.png"} alt="Get Premium" width={400} height={350} />
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <h2 className="text-4xl font-bold mb-10">Get Premium!</h2>
                        <span className="text-dark-gold text-shadow-md text-5xl font-bold mb-10">{plans.price}€</span>
                        <p className="text-lg italic mb-5">Unlock your art skills to the fullest!</p>
                        <ul className="space-y-2">
                            {plans.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center font-bold">
                                    <Check className="h-5 w-5 text-green-500 mr-2" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" className="mt-10 mb-5 p-6 text-2xl shadow-lg font-bold bg-gold text-white hover:bg-dark-gold hover:text-white">
                            Get Premium
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GetPremium