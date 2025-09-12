import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    // First, find the asset and verify it belongs to the user
    const asset = await prisma.asset.findFirst({
      where: {
        id,
        inventory: {
          userId: session.user.id
        }
      }
    })

    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }

    // Delete the asset
    await prisma.asset.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ message: 'Asset deleted successfully' })
  } catch (error) {
    console.error('Error deleting asset:', error)
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

    const { name, type, value, location, description } = await request.json()
    const { id } = await params

    // First, find the asset and verify it belongs to the user
    const existingAsset = await prisma.asset.findFirst({
      where: {
        id,
        inventory: {
          userId: session.user.id
        }
      }
    })

    if (!existingAsset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }

    // Update the asset
    const asset = await prisma.asset.update({
      where: {
        id
      },
      data: {
        name: name || undefined,
        type: type || undefined,
        value: value || undefined,
        location: location || undefined,
        description: description !== undefined ? description : undefined,
      }
    })

    return NextResponse.json(asset)
  } catch (error) {
    console.error('Error updating asset:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
