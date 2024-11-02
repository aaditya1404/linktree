import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { FaLocationDot } from "react-icons/fa6";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { FaLink } from "react-icons/fa";
import { Event } from "@/models/Event";


export default async function UserPage({ params }) {

    const uri = params.uri;
    mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({ uri });
    const user = await User.findOne({ email: page.owner });
    await Event.create({ uri: uri, type: 'view' });

    return (
        <div className="bg-blue-950 text-white min-h-screen">
            <div
                className=" h-52 py-16 flex justify-center items-center bg-cover bg-center"
                style={
                    page.bgType === 'color'
                        ? { backgroundColor: page.bgColor }
                        : { backgroundImage: `url(${page.bgImage})` }
                }
            >
            </div>
            <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
                <Image
                    className="rounded-full w-full h-full object-cover"
                    src={user.image}
                    alt="avatar"
                    width={256}
                    height={256}
                />
            </div>
            <h2
                className="text-xl text-center"
            >
                {page.displayName}
            </h2>
            <h3
                className="text-md flex text-center justify-center items-center gap-2 text-white/70"
            >
                <FaLocationDot
                    className=" text-md"
                />
                <span>
                    {page.location}
                </span>
            </h3>
            <div className="max-w-xs mx-auto text-center">
                <p>
                    {page.bio}
                </p>
            </div>
            <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
                {page.links.map(link => (
                    <Link
                        key={link}
                        ping={'/api/click?url=' + btoa(link.url)}
                        className="bg-indigo-800  p-2 flex"
                        href={link.url}
                    >
                        <div
                            className="bg-white relative -left-4 w-16 h-16 overflow-hidden flex items-center justify-center">
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
                        <div className="flex items-center justify-center shrink grow-0 overflow-hidden">
                            <div>
                                <h3>{link.title}</h3>
                                <p className="text-white/50 h-6 overflow-hidden">{link.subtitle}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}