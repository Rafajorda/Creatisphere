import getCurrentUser from "@/actions/getCurrentUser"
import getPremiumPosts from "@/actions/getPremiumPosts"
import { BuyPremiumButton } from "@/components/shared/buttons/BuyPremiumButton"
import { CardPremiumPost } from "@/components/shared/Cards/CardPremiumPost"
import { Check } from "lucide-react"
import Image from "next/image"
import React from "react"

const Premium = async () => {
    const currentUser = await getCurrentUser()
    const content = await getPremiumPosts()
    const isPremium = currentUser?.role === "PREMIUM"

    const plans = {
        name: "Pro",
        price: "19.99",
        features: [
            "Access to tutorials",
            "Access to previous premium content",
            "Priority support",
            "Get my brushes for PS and CSP",
        ],
    }

    return (
        <div className="container mx-auto p-4 my-10 flex">
            <div className={`space-y-8 ${isPremium ? "w-full" : "w-3/4 pr-4"}`}>
                {content.premiumPosts.map((item) => (
                    <CardPremiumPost key={item.id} item={item} isPremium={isPremium} />
                ))}
            </div>
            {!isPremium && (
                <div className="w-1/5 fixed right-28 top-48">
                    <div className="relative">
                        <Image
                            src="/assets/card_premium.png"
                            alt="Get Premium"
                            width={400}
                            height={350}
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
                            <h2 className="text-4xl font-bold">Get Premium!</h2>
                            <p className="text-md italic mb-2 font-bold">Unlock your art skills to the fullest!</p>
                            <span className="text-dark-gold text-shadow-md text-5xl font-bold mb-10">{plans.price}€</span>
                            <ul className="space-y-1 text-sm mb-8 font-semibold">
                                {plans.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <Check className="h-8 w-8 text-green-500 mr-1" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <BuyPremiumButton />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Premium

