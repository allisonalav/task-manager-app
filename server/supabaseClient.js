const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://elzqbigjtxpwbifuescg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsenFiaWdqdHhwd2JpZnVlc2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODIwNDEsImV4cCI6MjA2MzM1ODA0MX0.jfyzxiNnyErVAptPSORzdBRuGUOuhhbAV2RugdxJaZ0'; // use the full key

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
