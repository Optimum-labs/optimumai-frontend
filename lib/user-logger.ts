import { prisma } from './db'

export interface LogData {
  userId?: string
  supabaseId?: string
  action: string
  description: string
  ipAddress?: string
  userAgent?: string
  metadata?: any
  success?: boolean
}

export class UserLogger {
  static async log(data: LogData) {
    try {
      // If userId is provided, check if user exists in database
      if (data.userId) {
        const userExists = await prisma.user.findUnique({ where: { id: data.userId } })
        if (!userExists) {
          // User doesn't exist locally, log without userId but with supabaseId
          data.userId = undefined
          if (!data.supabaseId) {
            data.supabaseId = data.userId // Store the original userId as supabaseId
          }
        }
      }

      await prisma.userLog.create({
        data: {
          userId: data.userId,
          supabaseId: data.supabaseId,
          action: data.action,
          description: data.description,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          metadata: data.metadata || {},
          success: data.success !== false, // Default to true
        },
      })
    } catch (error) {
      console.error('Failed to log user activity:', error)
      // Don't throw error to avoid breaking the main flow
    }
  }

  static async logAuthAction(
    action: 'login' | 'logout' | 'signup' | 'password_reset' | 'email_verification',
    supabaseId: string | null,
    userId: string | null,
    success: boolean,
    metadata?: any,
    request?: Request
  ) {
    const ipAddress = this.getClientIP(request)
    const userAgent = request?.headers.get('user-agent') || undefined

    await this.log({
      userId,
      supabaseId,
      action,
      description: `${action.replace('_', ' ')} ${success ? 'successful' : 'failed'}`,
      ipAddress,
      userAgent,
      metadata,
      success,
    })
  }

  static async logUserAction(
    action: string,
    userId: string,
    description: string,
    metadata?: any,
    request?: Request
  ) {
    const ipAddress = this.getClientIP(request)
    const userAgent = request?.headers.get('user-agent') || undefined

    await this.log({
      userId,
      action,
      description,
      ipAddress,
      userAgent,
      metadata,
    })
  }

  static async logSystemAction(
    action: string,
    description: string,
    metadata?: any,
    request?: Request
  ) {
    const ipAddress = this.getClientIP(request)
    const userAgent = request?.headers.get('user-agent') || undefined

    await this.log({
      action,
      description,
      ipAddress,
      userAgent,
      metadata,
    })
  }

  private static getClientIP(request?: Request): string | undefined {
    if (!request) return undefined

    // Check for forwarded IP headers
    const forwardedFor = request.headers.get('x-forwarded-for')
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim()
    }

    const realIP = request.headers.get('x-real-ip')
    if (realIP) {
      return realIP
    }

    const cfConnectingIP = request.headers.get('cf-connecting-ip')
    if (cfConnectingIP) {
      return cfConnectingIP
    }

    // Fallback to remote address (not available in serverless)
    return undefined
  }
}