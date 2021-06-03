import { readFileSync } from 'fs'
import path from 'path'
import crypto from 'crypto'

const getFileBlocksNumber = file => {
    const BLOCK_SIZE = 1024
    const size = file.byteLength
    const BLOCKS_NUMBER = Math.abs(size / BLOCK_SIZE)
    return BLOCKS_NUMBER
}

const addFileBlocksToArray = (file, blocksNumber) => {
    let count = 0
    const blockArray = []
    const BLOCK_SIZE = 1024

    while (count < blocksNumber) {
        let padding = count * BLOCK_SIZE
        blockArray.push(file.slice(padding, padding + BLOCK_SIZE))
        count += 1
    }

    return blockArray
}

const calculateHashForBlocks = blockArray => {
    console.log('Reversing block array...')
    blockArray.reverse()
    const res = []

    for (let i = 0; i < blockArray.length; i++) {
        if (i === 0) {
            const hash = crypto.createHash('sha256');
            const firstHash = hash.update(blockArray[i]).digest()
            res.push(firstHash)
        } else {
            const hash = crypto.createHash('sha256');
            const block = hash.update(Buffer.concat([blockArray[i], res[i - 1]])).digest()
            res.push(block)
        }
    }

    return res.reverse()
}

const beginAlgorithm = file => {
    const blocksNumber = getFileBlocksNumber(file)

    console.log(`We have ${blocksNumber} blocks of 1024 bytes in a file of ${file.byteLength} bytes`)
    console.log('Parsing file to blocks...')
    const blockArray = addFileBlocksToArray(file, blocksNumber)
    console.log('Finished parsing!')
    console.log(`The block array has ${blockArray.length} blocks of ${blockArray[0].length} bytes`)

    console.log('Calculating hash for each block...')
    const hash = calculateHashForBlocks(blockArray)

    console.log(`Result for h0 is: ${hash[0].toString('hex')}`)
    console.log(`Result for last block is: ${hash[hash.length - 1].toString('hex')}`)
    console.log('\n')
    console.log(`Expected output for h0: 302256b74111bcba1c04282a1e31da7e547d4a7098cdaec8330d48bd87569516`)
    console.log(`Expected output for last block: 37d88ff100aaf4c63bb828ff1a89f99af2123e143bd758d0eb1573a044e74c84`)
}

const start = (): void => {
    const file = readFileSync(path.join(__dirname, '../FuncoesResumo - SHA1.mp4'))
    beginAlgorithm(file)
}

start()
