"use client";
import RadioTogglers from "../formItems/radioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";
import { upload } from "@/libs/upload";

export default function PageSettingsForm({ page, user }) {
    const [bgType, setBgType] = useState(page.bgType);
    const [bgColor, setBgColor] = useState(page.bgColor);
    const [bgImage, setBgImage] = useState(page.bgImage);
    const [avatar, setAvatar] = useState(user?.image);

    async function saveBaseSettings(formData) {
        const result = await savePageSettings(formData);
        if (result) {
            toast.success("Saved");
        }
    }

    function handleFileChange(ev){
        const file = ev.target.files?.[0];
        console.log(file);
        if(file){
            const data = new FormData;
            data.set('file', file);
            fetch('/api/upload',{
                method:'POST',
                body: data,
            }).then(response => {
                response.json().then(link => {
                    setBgImage(link);
                })
            })
        }
    }



    async function handleCoverImageChange(e) {
        await upload(e, link => {
            setBgImage(link);
        });
    }

    async function handleAvatarImageChange(e) {
        await upload(e, link => {
            setAvatar(link);
        });
    }

    return (
        <div>
            <SectionBox>
                <form action={saveBaseSettings}>
                    <div
                        className=" py-16 -m-4 flex justify-center items-center bg-cover bg-center"
                        style={
                            bgType === 'color'
                                ? { backgroundColor: bgColor }
                                : { backgroundImage: `url(${bgImage})` }
                        }
                    >
                        <div>
                            <RadioTogglers
                                defaultValue={page.bgType}
                                options={[
                                    { value: "color", label: "Color" },
                                    { value: "image", label: "Image" },
                                ]}
                                onChange={(val) => setBgType(val)}
                            />
                            {bgType === "color" && (
                                <div className="bg-gray-200 shadow text-gray-700 p-1 mt-2">
                                    <div className="flex gap-2 text-xs font-bold justify-center items-center">
                                        <span>Background Color:</span>
                                        <input
                                            type={"color"}
                                            className="h-6 w-8"
                                            name="bgColor"
                                            onChange={(e) => setBgColor(e.target.value)}
                                            defaultValue={page.bgColor}
                                        />
                                    </div>
                                </div>
                            )}
                            {bgType === "image" && (
                                <div className="flex justify-center">
                                    <label
                                        className="bg-white shadow px-4 py-2 mt-2"
                                    >
                                        <input
                                            type="hidden"
                                            name="bgImage"
                                            value={bgImage}
                                        />
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        Change Image
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center -mb-12">
                        <div className="relative -top-8 ">
                            {/* 6:15 me kuch changes kiye hai profile image ko leke agar jarurat hua to yahan v kar denge */}
                            <Image
                                className="rounded-full border-4 border-white shadow-lg "
                                src={avatar}
                                alt={"avatar"}
                                width={128}
                                height={128}
                            />
                            <label
                                htmlFor="avatarIn"
                                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer"
                            >
                                Icon
                            </label>
                            <input
                                onChange={handleAvatarImageChange}
                                id="avatarIn" type="file"
                                className="hidden"
                            />
                            <input type="hidden" name="avatar" value={avatar} />
                        </div>
                    </div>

                    <div className="p-0">
                        <label className="input-label" htmlFor="nameIn">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="nameIn"
                            name="displayName"
                            defaultValue={page.displayName}
                            placeholder="John Doe"
                        />
                        <label className="input-label" htmlFor="location">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            defaultValue={page.location}
                            placeholder="Somewhere in the world"
                        />
                        <label className="input-label" htmlFor="bioIn">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            defaultValue={page.bio}
                            id="bioIn"
                            placeholder="Your bio goes here..."
                        />
                        <div className="max-w-xs mx-auto">
                            <SubmitButton>Save</SubmitButton>
                        </div>
                    </div>
                </form>
            </SectionBox>

        </div>
    );
}
