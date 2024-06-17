import contentJson from '../../../../../../static/content.json'

export const prerender = true
export const csr = false

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
    const locales = Object.keys(contentJson) as Array<keyof typeof contentJson>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iterateKeys = (obj: any, parentKey?: string): string[] => [
        parentKey ?? '',
        ...Object.keys(obj).flatMap((key) => {
            const descentKey = `${parentKey ?? ''}${parentKey != null ? '/' : ''}${key}`
            return typeof obj[key] === 'object' ? iterateKeys(obj[key], descentKey) : descentKey
        })
    ]

    return [
        { path: '' },
        ...locales.flatMap((locale) =>
            iterateKeys(contentJson[locale]).map((path) => ({ locale, path }))
        )
    ]
}

/** @type {import('./$types').PageLoad} */
export async function load(event) {
    let { locale, path } = event.params

    const response = await event.fetch('/content.json')

    const contentJson = await response.json()

    const locales = Object.keys(contentJson)

    if (!locales.includes(locale!)) {
        path = `${locale ?? ''}${path?.length > 0 ? `.${path}` : path}`
        locale = undefined
    }

    const objectKey = path.replaceAll(/\//g, '.')
    let objectValue = contentJson[locale ?? 'en']

    if (objectKey?.length > 0) {
        try {
            const keys = objectKey.split('.')
            while (keys.length > 0) {
                const key = keys.shift()
                objectValue = objectValue[key!]
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        key: objectKey,
        value: objectValue
    }
}
