import fs from 'node:fs'
import { parse } from 'csv-parse'

async function ReadCSVStream() {
  const lines = fs.createReadStream(new URL('./file.csv', import.meta.url))
    .pipe(parse({
      delimiter: ',',
      skip_empty_lines: true,
      from_line: 2
    }))

    for await (const line of lines) {
      const [title, description] = line
      await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        })
      })
    }
}

ReadCSVStream()
