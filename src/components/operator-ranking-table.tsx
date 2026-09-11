import { z } from "zod"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { RankingUserSchema } from "../schemas/report"

export type RankingUser = z.infer<typeof RankingUserSchema>

interface OperatorRankingTableProps {
  data: RankingUser[]
}

export function OperatorRankingTable({ data }: OperatorRankingTableProps) {
  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableCaption className="pb-4">Ranking de performance dos operadores neste mês.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Posição</TableHead>
            <TableHead>Operador</TableHead>
            <TableHead className="text-right">Tickets Resolvidos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((operator, index) => (
            <TableRow key={operator.user.id}>
              <TableCell className="text-center font-medium">
                {index + 1}º
              </TableCell>
              <TableCell>
                <div className="font-semibold">{operator.user.name}</div>
                <div className="text-xs text-muted-foreground">{operator.user.email}</div>
              </TableCell>
              <TableCell className="text-right">{operator.resolved_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
