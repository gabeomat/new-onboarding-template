/*
  # Create quiz submissions table

  1. New Tables
    - `quiz_submissions`
      - `id` (uuid, primary key)
      - `email` (text, required) - User's email address
      - `answers` (jsonb, required) - Quiz answers stored as JSON
      - `created_at` (timestamptz) - Submission timestamp
      
  2. Security
    - Enable RLS on `quiz_submissions` table
    - Add policy for service role to insert data (edge function access)
    - Public can insert their own submissions
    
  3. Indexes
    - Add index on email for faster lookups
    - Add index on created_at for time-based queries
*/

CREATE TABLE IF NOT EXISTS quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  answers jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quiz responses"
  ON quiz_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all submissions"
  ON quiz_submissions
  FOR SELECT
  TO service_role
  USING (true);

CREATE INDEX IF NOT EXISTS idx_quiz_submissions_email ON quiz_submissions(email);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_created_at ON quiz_submissions(created_at DESC);