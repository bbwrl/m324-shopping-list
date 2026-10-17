import { NextResponse } from 'next/server'
import { shoppingLists } from '../data'

export async function GET(request) {
  const code = request.nextUrl.searchParams.get('code')
  const list = shoppingLists[code]

  if (!list) {
    return NextResponse.json({ error: 'List not found' }, { status: 404 })
  }

  return NextResponse.json({ items: list.items, members: list.members })
}
