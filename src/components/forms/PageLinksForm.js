"use client";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../layout/SectionBox";
import { FaPlus } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { PiCloudArrowUpBold } from "react-icons/pi";
import { FaGripLines, FaTrash } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({ page, user }) {

    const [links, setLinks] = useState(page.links || []);

    async function save() {
        await savePageLinks(links);
        toast.success('Saved!');
    }

    function addNewLink() {
        setLinks(prev => {
            return [...prev, {
                key: Date.now().toString(),
                title: '',
                subtitle: '',
                icon: '',
                url: ''
            }];
        });
    }

    function handleUpload(e, linkKeyForUpload) {
        upload(e, uploadedImageUrl => {
            setLinks(prevLinks => {
                const newLinks = [...prevLinks];
                newLinks.forEach((link, index) => {
                    if (link.key === linkKeyForUpload) {
                        link.icon = uploadedImageUrl;
                    }
                });
                return newLinks;
            });
        });
    }

    function handleLinkChange(keyOfLinkToChange, prop, e) {
        setLinks(prev => {
            const newLinks = [...prev];
            newLinks.forEach((link) => {
                if (link.key === keyOfLinkToChange) {
                    link[prop] = e.target.value;
                }
            });
            return [...prev];
        });
    };

    function removeLink(linkKeyToRemove){
        setLinks(prevLinks => 
            [...prevLinks].filter(l => l.key !== linkKeyToRemove)
        );
    }

    return (
        <SectionBox>
            <form action={save}>
                <h2 className="text-2xl font-bold mb-4">Links</h2>
                <button
                    onClick={addNewLink}
                    type="button"
                    className="text-blue-500 text-lg flex gap-2 items-center "
                >
                    <FaPlus className="bg-blue-500 text-white p-1 rounded-full aspect-square" />
                    <span>Add new</span>
                </button>
                {/* {JSON.stringify(links)} */}
                <div>
                    <ReactSortable
                        handle={'.handle'}
                        list={links}
                        setList={setLinks}
                    >
                        {links.map(l => (
                            <div key={l.key} className="mt-8 flex gap-4 items-center" >
                                <div className="handle">
                                    <FaGripLines className="text-gray-700 mr-2 cursor-grabbing" />
                                </div>
                                <div className="text-center">
                                    <div className="bg-gray-300  relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                                        {l.icon && (
                                            <Image
                                                className="w-full h-full object-cover rounded-full"
                                                src={l.icon}
                                                width={64}
                                                height={64}
                                                alt="icon"
                                            />
                                        )}
                                        {!l.icon && (
                                            <FaLink />
                                        )}
                                    </div>
                                    <div>
                                        {JSON.stringify(l.icon)}
                                        <input
                                            onChange={e => handleUpload(e, l.key)}
                                            id={'icon' + l.key}
                                            type="file"
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={'icon' + l.key}
                                            className=" bg-gray-300 mb-2 mt-2 p-2 flex items-center gap-2 rounded-md cursor-pointer"
                                        >
                                            <PiCloudArrowUpBold />
                                            <span>
                                                Change Icon
                                            </span>
                                        </label>
                                        <button
                                            onClick={() => removeLink(l.key)}
                                            type="button"
                                            className="bg-gray-300 py-2 px-2 mb-2 h-full flex gap-1 items-center"
                                        >
                                            <FaTrash />
                                            <span>Remove this Link</span>
                                        </button>
                                    </div>

                                </div>
                                <div className="grow">
                                    <label className="input-label" >Title:</label>
                                    <input
                                        value={l.title}
                                        onChange={e => handleLinkChange(l.key, 'title', e)}
                                        type="text"
                                        placeholder="title"
                                    />
                                    <label className="input-label" >Subtitle:</label>
                                    <input
                                        value={l.subtitle}
                                        onChange={e => handleLinkChange(l.key, 'subtitle', e)}
                                        type="text"
                                        placeholder="subtile (optional)"
                                    />
                                    <label className="input-label" >Url:</label>
                                    <input
                                        value={l.url}
                                        onChange={e => handleLinkChange(l.key, 'url', e)}
                                        type="text"
                                        placeholder="url"
                                    />
                                </div>
                                <div>

                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
                <div className="border-t pt-4 mt-4 ">
                    <SubmitButton className="max-w-xs mx-auto" >
                        {/* <RiSave3Line /> */}
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}