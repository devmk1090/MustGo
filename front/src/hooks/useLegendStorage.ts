import { storageKeys } from "@/constants";
import useLegentStore from "@/store/useLegentStore";
import { getEncryptStorage, setEncryptStorage } from "@/utils";
import { useEffect } from "react";

function useLegendStorage() {
    const { isVisible, setIsVisible } = useLegentStore()

    const set = async (flag: boolean) => {
        await setEncryptStorage(storageKeys.SHOW_LEGEND, flag)
        setIsVisible(flag)
    }
    useEffect(() => {
        (async () => {
            const storedData = (await getEncryptStorage(storageKeys.SHOW_LEGEND)) ?? false
            setIsVisible(storedData)
        })()
    }, [])

    return { set, isVisible };
}

export default useLegendStorage;
