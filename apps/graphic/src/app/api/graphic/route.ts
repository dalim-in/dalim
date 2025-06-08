import { NextRequest, NextResponse } from 'next/server'
import { getGraphics } from '@/src/actions/graphic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const page = Number.parseInt(searchParams.get('page') || '1')
    const limit = Number.parseInt(searchParams.get('limit') || '12')

    const result = await getGraphics({
      search,
      category,
      tags,
      page,
      limit,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch graphics' },
      { status: 500 }
    )
  }
}
