/*
  # Add admin-only access policies

  1. Changes
    - Drop existing service role policy
    - Add policy for admin user to read all quiz submissions
    - Only coachme@gabrielomat.com can access the data when authenticated
    
  2. Security
    - Authenticated users can only read if their email matches the admin email
    - Maintains existing policy allowing anyone to submit quiz responses
*/

DROP POLICY IF EXISTS "Service role can read all submissions" ON quiz_submissions;

CREATE POLICY "Admin can read all submissions"
  ON quiz_submissions
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'coachme@gabrielomat.com'
  );