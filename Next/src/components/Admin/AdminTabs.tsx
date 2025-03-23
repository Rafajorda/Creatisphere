import React from "react";
import { Tabs } from "../ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { getAllIncidents } from "../../actions/getIncident";
import { getProductById } from "../../actions/getProduct";
import getProducts from "../../actions/getProducts";
import { $Enums } from "@prisma/client";
import { all } from "axios";
import { ToggleIncidentButton, ToggleProductButton } from "./buttonsAdmin";

export const AdminTabs = async () => {
    const incidentsData = await getAllIncidents($Enums.status.ACTIVE);
    const productsData: { [key: number]: any } = {};
    const productsresolvedData: { [key: number]: any } = {};
    const resolvedIncidentsData = await getAllIncidents($Enums.status.INACTIVE);

    for (const incident of incidentsData) {
        if (incident.productId !== null) {
            const product = await getProductById({ id: incident.productId });
            productsData[incident.productId] = product;
        }
    }
    for (const incident of resolvedIncidentsData) {
        if (incident.productId !== null) {
            const product = await getProductById({ id: incident.productId });
            productsresolvedData[incident.productId] = product;
        }
    }
    const allProducts = await getProducts({}, false);
   
    return (
        <>
        <Tabs defaultValue="incidents" className="w-full mt-10 justify-center">
            <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="incidents" className="my-5 py-1 rounded-l-xl font-bold bg-zinc-700 data-[state=active]:text-black data-[state=active]:bg-teal-400">
                Incidents
            </TabsTrigger>
            <TabsTrigger value="resolved" className="my-5 py-1 font-bold bg-zinc-700 data-[state=active]:text-black data-[state=active]:bg-teal-400">
                Resolved
            </TabsTrigger>
            <TabsTrigger value="products" className="my-5 py-1 rounded-r-xl font-bold bg-zinc-700 data-[state=active]:text-black data-[state=active]:bg-teal-400">
                Products
            </TabsTrigger>
            </TabsList>

            <TabsContent value="incidents">
                <div className="flex flex-col gap-4">
                    {incidentsData.map((incident) => (
                        <div key={incident.id} className="border p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold">{incident.slug}</h2>
                                <p>{incident.description}</p>
                                <a href={`/Details/${productsData[incident.productId]?.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    {incident.productId !== null && productsData[incident.productId]?.slug}
                                </a>
                            </div>
                            <ToggleIncidentButton incidentId={incident.id} status={incident.status} />
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="resolved">
                <div className="flex flex-col gap-4">
                    {resolvedIncidentsData.map((incident) => (
                        <div key={incident.id} className="border p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold">{incident.slug}</h2>
                                <p>{incident.description}</p>
                                <a href={`/Details/${productsresolvedData[incident.productId]?.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    {incident.productId !== null && productsresolvedData[incident.productId]?.slug}
                                </a>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="products">
                <div className="flex flex-col gap-4">
                    {allProducts?.products.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold">
                                <a href={`/Details/${product.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    {product.name}
                                </a>
                                </h2>
                                <p>{product.description}</p>
                            </div>
                       <ToggleProductButton productSlug={product.slug} status={product.status} />
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
        </>
    );
};