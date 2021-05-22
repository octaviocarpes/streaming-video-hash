import fs from 'fs'
import path from 'path'


const calculateHash = (byteArray: [][]) => {
//    TODO: finish this

}

const convertToBlockArray = (array: Buffer) => {
    const BLOCK_SIZE = 1024
    const res = []
    let block = []
    let count = 0

    for (let i = 0; i < array.length; i++) {
        if (count < BLOCK_SIZE) {
            block.push(array[i])
        } else {
            res.push(block)
            count = 0
            block = []
        }
        count++
    }

    return res
}

const getByteBlocksArray = (path: string) => {
    const buffer = fs.readFileSync(path);

    return convertToBlockArray(buffer)
}

const start = (): void => {
    console.log('Calculating hash for file FuncoesResumo - Hash Functions.mp4')

    const byteArray = getByteBlocksArray(path.join(__dirname, '../FuncoesResumo - Hash Functions.mp4'))

    console.log(calculateHash(byteArray.reverse()))
}

start()
