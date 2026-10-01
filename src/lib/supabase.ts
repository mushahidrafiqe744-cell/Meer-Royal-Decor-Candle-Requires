import { createClient } from '@supabase/supabase-js';

// Load Supabase URL and Anon Key from environment variables if provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Supabase Database Table Schema definitions:
 * 
 * 1. bookings:
 *    - id (text, primary key)
 *    - name (text)
 *    - phone (text)
 *    - date (text)
 *    - time_slot (text)
 *    - event_type (text)
 *    - city (text)
 *    - created_at (timestamptz)
 *    - status (text)
 * 
 * 2. orders:
 *    - id (text, primary key)
 *    - order_number (text)
 *    - customer_name (text)
 *    - phone (text)
 *    - city (text)
 *    - address (text)
 *    - items (jsonb)
 *    - subtotal (numeric)
 *    - delivery_fee (numeric)
 *    - total (numeric)
 *    - delivery_method (text)
 *    - payment_method (text)
 *    - status (text)
 *    - created_at (timestamptz)
 * 
 * 3. products:
 *    - id (text, primary key)
 *    - name (text)
 *    - name_urdu (text)
 *    - category (text)
 *    - price (numeric)
 *    - original_price (numeric)
 *    - image (text)
 *    - description (text)
 *    - scent_notes (jsonb)
 *    - in_stock (boolean)
 *    - rating (numeric)
 *    - reviews_count (numeric)
 * 
 * 4. team_members:
 *    - id (text, primary key)
 *    - name (text)
 *    - designation (text)
 *    - call_number (text)
 *    - whatsapp_number (text)
 *    - avatar_type (text)
 *    - bio (text)
 */
