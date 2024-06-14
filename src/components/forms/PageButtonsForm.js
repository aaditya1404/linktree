"use client";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import { ReactSortable } from "react-sortablejs";
import toast from "react-hot-toast";
import { FaGripLines } from "react-icons/fa6";



export const allButtons = [
    { key: 'email', 'label': 'e-mail', placeholder: 'test@example.com' },
    { key: 'mobile', 'label': 'Mobile', placeholder: '+91-00000 00000' },
    { key: 'instagram', 'label': 'instagram', placeholder: '@insta_user' },
    { key: 'facebook', 'label': 'facebook', placeholder: 'facebook user' },
    { key: 'discord', 'label': 'discord', placeholder: '@discord_user' },
    { key: 'tiktok', 'label': 'tiktok', placeholder: 'tiktok_user' },
    { key: 'youtube', 'label': 'youtube', placeholder: 'youtube_user' },
    { key: 'whatsapp', 'label': 'whatsapp', placeholder: 'user whatsapp' },
    { key: 'github', 'label': 'github', placeholder: 'github_id' },
    { key: 'telegram', 'label': 'telegram', placeholder: 'telegram user' }
];

function upperFirst(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export default function PageButtonsForm({ user, page }) {
    // console.log(page);
// 
    // const pageSavedButtonKeys = Object.keys(page.buttons);
    // const pageSavedButtonsInfo = pageSavedButtonKeys.map(k => allButtons.find(b => b.key === k));
    // const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);
    const [activeButtons, setActiveButtons] = useState("");

    function addButtonToProfile(button) {
        setActiveButtons(prevButtons => {
            return [...prevButtons, button];
        });
    }

    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success('Settings saved!');
    }

    function removeButton({ key: keyToRemove }) {
        setActiveButtons(prevButtons => {
            return prevButtons.filter(button => button.key !== keyToRemove)
        })
    }

    // const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

    // {JSON.stringify(pageSavedButtonKeys)}
    return (
        <SectionBox>
           
        </SectionBox>
    )
}

