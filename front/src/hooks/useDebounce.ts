import { useCallback, useEffect, useMemo, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    const updateDebouncedValue  = useCallback(() => {
        setDebouncedValue(value)
    }, [value])

    useEffect(() => {
        const timer = setTimeout(updateDebouncedValue, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [delay, updateDebouncedValue])

    // useMemo를 사용하여 debouncedValue를 메모이제이션하여 반환
    // debouncedValue가 변경되지 않는 한 동일한 객체를 반환하여 불필요한 리렌더링을 방지
    return useMemo(() => debouncedValue, [debouncedValue])
}

export default useDebounce;