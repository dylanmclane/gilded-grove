import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, type, value, location, description } = await request.json()

    if (!name || !type || !value || !location) {
      return NextResponse.json(
        { error: 'Name, type, value, and location are required' },
        { status: 400 }
      )
    }

    const { id } = await params

    // Verify the inventory belongs to the user
    const inventory = await prisma.inventory.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!inventory) {
      return NextResponse.json({ error: 'Inventory not found' }, { status: 404 })
    }

    const asset = await prisma.asset.create({
      data: {
        name,
        type,
        value,
        location,
        description: description || null,
        inventoryId: id,
      }
    })

    return NextResponse.json(asset, { status: 201 })
  } catch (error) {
    console.error('Error creating asset:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
