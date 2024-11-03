import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { FaLocationDot } from "react-icons/fa6";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { FaLink } from "react-icons/fa";
import { Event } from "@/models/Event";
import { FaHeart } from "react-icons/fa6";


export default async function UserPage({ params }) {

    const uri = params.uri;
    mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({ uri });
    const user = await User.findOne({ email: page.owner });
    await Event.create({ uri: uri, type: 'view' });

    return (
        <div className=" text-white min-h-screen bg-cover bg-center w-full h-full"
            style={
                page.bgType === 'color'
                    ? { backgroundColor: page.bgColor }
                    : { backgroundImage: `url(${page.bgImage})` }
            }
        >
            <div className="h-full ">
                <div
                    className="h-52 flex justify-center items-center bg-cover bg-center"
                >
                </div>
                <div className="aspect-square w-28 h-28 mx-auto relative -top-32 -mb-12">
                    <Image
                        className="rounded-full w-full h-full object-cover"
                        src={user.image}
                        alt="avatar"
                        width={256}
                        height={256}
                    />
                </div>
                <h2
                    className="text-xl text-center relative -top-16 text-[#083170] font-bold"
                >
                    {page.displayName}
                </h2>
                <h3
                    className="text-xs flex text-center justify-center items-center gap-1 font-semibold text-[#083170]/70 relative -top-16"
                >
                    <FaLocationDot
                        className="text-xs"
                    />
                    <span>
                        {page.location}
                    </span>
                </h3>
                <div className="max-w-xs mx-auto text-center relative -top-16 text-[#083170] font-semibold ">
                    <p >
                        {page.bio}
                    </p>
                </div>
                <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8 relative -top-16">
                    {page.links.map(link => (
                        <Link
                            key={link}
                            ping={'/api/click?url=' + btoa(link.url)}
                            className="bg-white p-2 flex items-center gap-4 rounded-[29px]"
                            href={link.url}
                        >
                            <div
                                className="relative w-8 h-8 overflow-hidden rounded-full flex items-center justify-center">
                                {link.icon && (
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={link.icon}
                                        alt="icon"
                                        width={64}
                                        height={64}
                                    />
                                )}
                                {!link.icon && (
                                    <FaLink className="w-8 h-8" />
                                )}
                            </div>
                            <div className="flex items-center justify-center shrink grow-0 overflow-hidden relative top-1">
                                <div className="text-[#083170]" >
                                    <h3>{link.title}</h3>
                                    <p className="text-[#083170]/50 h-6 overflow-hidden text-sm relative -top-1">{link.subtitle}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex items-center gap-1 text-[#083170] text-sm bottom-0">
                    Created with <FaHeart className="text-red-500" /> by {page.displayName}
                </div>
            </div>
        </div>
    );
}