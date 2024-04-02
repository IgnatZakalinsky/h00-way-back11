import express, {Request, Response} from 'express'

export const app = express()

app.use(express.json())

export type VType = { version: string }
app.get('/', (req, res: Response<VType>) => {
    res.json({version: '1.0'})
})

export type IdParamType = { id: string }
export type SearchQueryType = { search?: string }
export type GetAnswerType = { id: number | 'NaN', search: string, query?: object }
app.get('/:id', (req: Request<IdParamType, GetAnswerType, {}, SearchQueryType>, res: Response<GetAnswerType>) => {
    res
        .status(Number.isNaN(+req.params.id) ? 400 : 200)
        .json({
            id: +req.params.id || 'NaN',
            search: req.query.search || '',
            query: req.query,
        })
})

export type SomeBodyType = { some: string }
export type PostAnswerType = { someData: string, token: string | 401 }
app.post('/', (req: Request<{}, PostAnswerType, SomeBodyType>, res: Response<PostAnswerType>) => {
    res.json({
        someData: req.body.some,
        token: req.headers.token as string || 401,
        // x: 1, // не проверяет на лишние данные, но при компиляции для теста будет ругаться
    })
})

app.listen(3000, () => {
    console.log('app running on port 3000')
})