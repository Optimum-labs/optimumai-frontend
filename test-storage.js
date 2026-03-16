import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // Use service role key for server-side operations
)

async function testBucket() {
  console.log('Testing resumes bucket...')
  console.log('Using URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

  try {
    // First try to upload directly to see if bucket exists
    console.log('Attempting direct upload to test bucket existence...')
    const dummyContent = 'test file content for resume upload'
    const blob = new Blob([dummyContent], { type: 'text/plain' })
    const fileName = `test-${Date.now()}.txt`

    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, blob, { contentType: 'text/plain' })

    if (error) {
      console.error('❌ Upload failed:', error.message)
      console.error('Status:', error.statusCode)

      if (error.statusCode === 404 || error.message.includes('not found') || error.message.includes('bucket')) {
        console.log('\n❌ "resumes" bucket does not exist!')
        console.log('\n📋 To create it in Supabase dashboard:')
        console.log('1. Go to https://supabase.com/dashboard')
        console.log('2. Select your project')
        console.log('3. Go to Storage → Create bucket')
        console.log('4. Name: resumes')
        console.log('5. Make it public (check the box)')
        console.log('6. Click Create bucket')
        return
      }

      if (error.statusCode === '403' || error.message.includes('JWT') || error.message.includes('permission') || error.message.includes('Compact JWS')) {
        console.log('\n🔐 Permission issue. To fix:')
        console.log('1. Make sure the bucket is public, OR')
        console.log('2. Set up RLS policies in Supabase:')
        console.log('   - Go to Storage → resumes bucket → Policies')
        console.log('   - Add policy: Allow ALL users to upload')
        console.log('   - SQL: bucket_id = \'resumes\'')
        console.log('   - OR get your SERVICE_ROLE_KEY from Supabase dashboard and update .env.local')
        return
      }
    } else {
      console.log('✅ Bucket exists and upload successful!')
      console.log('File path:', data.path)

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName)

      console.log('📎 Public URL:', urlData.publicUrl)

      // Clean up - delete the test file
      const { error: deleteError } = await supabase.storage.from('resumes').remove([fileName])
      if (deleteError) {
        console.log('⚠️  Could not clean up test file:', deleteError.message)
      } else {
        console.log('🧹 Test file cleaned up')
      }
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
  }
}

testBucket()