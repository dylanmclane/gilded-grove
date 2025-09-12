import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const inventory = await prisma.inventory.findFirst({
      where: {
        id,
        userId: session.user.id
      },
      include: {
        assets: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!inventory) {
      return NextResponse.json({ error: 'Inventory not found' }, { status: 404 })
    }

    return NextResponse.json(inventory)
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description } = await request.json()
    const { id } = await params

    const inventory = await prisma.inventory.updateMany({
      where: {
        id,
        userId: session.user.id
      },
      data: {
        name: name || undefined,
        description: description !== undefined ? description : undefined,
      }
    })

    if (inventory.count === 0) {
      return NextResponse.json({ error: 'Inventory not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Inventory updated successfully' })
  } catch (error) {
    console.error('Error updating inventory:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const inventory = await prisma.inventory.deleteMany({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (inventory.count === 0) {
      return NextResponse.json({ error: 'Inventory not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Inventory deleted successfully' })
  } catch (error) {
    console.error('Error deleting inventory:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
