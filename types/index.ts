export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'staff' | 'kitchen';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'admin' | 'staff' | 'kitchen';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'admin' | 'staff' | 'kitchen';
          created_at?: string;
          updated_at?: string;
        };
      };
      restaurant_settings: {
        Row: {
          id: string;
          name: string;
          claim: string | null;
          description: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          postal_code: string | null;
          country: string | null;
          google_maps_url: string | null;
          instagram_url: string | null;
          wolt_url: string | null;
          lieferando_url: string | null;
          logo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          claim?: string | null;
          description?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          postal_code?: string | null;
          country?: string | null;
          google_maps_url?: string | null;
          instagram_url?: string | null;
          wolt_url?: string | null;
          lieferando_url?: string | null;
          logo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          claim?: string | null;
          description?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          postal_code?: string | null;
          country?: string | null;
          google_maps_url?: string | null;
          instagram_url?: string | null;
          wolt_url?: string | null;
          lieferando_url?: string | null;
          logo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          original_name: string;
          german_name: string;
          slug: string;
          description: string | null;
          note: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          original_name: string;
          german_name: string;
          slug: string;
          description?: string | null;
          note?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          original_name?: string;
          german_name?: string;
          slug?: string;
          description?: string | null;
          note?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string;
          item_number: number | null;
          name: string;
          description: string | null;
          price: number;
          price_label: string | null;
          image_url: string | null;
          note: string | null;
          options_text: string | null;
          allergens_text: string | null;
          is_vegetarian: boolean;
          is_vegan: boolean;
          is_spicy: boolean;
          is_halal: boolean;
          is_sold_out: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          item_number?: number | null;
          name: string;
          description?: string | null;
          price: number;
          price_label?: string | null;
          image_url?: string | null;
          note?: string | null;
          options_text?: string | null;
          allergens_text?: string | null;
          is_vegetarian?: boolean;
          is_vegan?: boolean;
          is_spicy?: boolean;
          is_halal?: boolean;
          is_sold_out?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          item_number?: number | null;
          name?: string;
          description?: string | null;
          price?: number;
          price_label?: string | null;
          image_url?: string | null;
          note?: string | null;
          options_text?: string | null;
          allergens_text?: string | null;
          is_vegetarian?: boolean;
          is_vegan?: boolean;
          is_spicy?: boolean;
          is_halal?: boolean;
          is_sold_out?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          reviewer_name: string;
          rating: number;
          text: string;
          review_date: string | null;
          source: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reviewer_name: string;
          rating: number;
          text: string;
          review_date?: string | null;
          source?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reviewer_name?: string;
          rating?: number;
          text?: string;
          review_date?: string | null;
          source?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_platforms: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          icon_name: string | null;
          url: string;
          supports_pickup: boolean;
          supports_delivery: boolean;
          fee_label: string | null;
          time_label: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          icon_name?: string | null;
          url: string;
          supports_pickup?: boolean;
          supports_delivery?: boolean;
          fee_label?: string | null;
          time_label?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          icon_name?: string | null;
          url?: string;
          supports_pickup?: boolean;
          supports_delivery?: boolean;
          fee_label?: string | null;
          time_label?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      reservations: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          reservation_date: string;
          reservation_time: string;
          guests: number;
          message: string | null;
          status: 'neu' | 'bestätigt' | 'abgelehnt' | 'erledigt';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          reservation_date: string;
          reservation_time: string;
          guests: number;
          message?: string | null;
          status?: 'neu' | 'bestätigt' | 'abgelehnt' | 'erledigt';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          reservation_date?: string;
          reservation_time?: string;
          guests?: number;
          message?: string | null;
          status?: 'neu' | 'bestätigt' | 'abgelehnt' | 'erledigt';
          created_at?: string;
          updated_at?: string;
        };
      };
      opening_hours: {
        Row: {
          id: string;
          weekday: number;
          opens_at: string | null;
          closes_at: string | null;
          opens_at_2: string | null;
          closes_at_2: string | null;
          is_closed: boolean;
          note: string | null;
        };
        Insert: {
          id?: string;
          weekday: number;
          opens_at?: string | null;
          closes_at?: string | null;
          opens_at_2?: string | null;
          closes_at_2?: string | null;
          is_closed?: boolean;
          note?: string | null;
        };
        Update: {
          id?: string;
          weekday?: number;
          opens_at?: string | null;
          closes_at?: string | null;
          opens_at_2?: string | null;
          closes_at_2?: string | null;
          is_closed?: boolean;
          note?: string | null;
        };
      };
      special_opening_hours: {
        Row: {
          id: string;
          date: string;
          opens_at: string | null;
          closes_at: string | null;
          is_closed: boolean;
          note: string | null;
        };
        Insert: {
          id?: string;
          date: string;
          opens_at?: string | null;
          closes_at?: string | null;
          is_closed?: boolean;
          note?: string | null;
        };
        Update: {
          id?: string;
          date?: string;
          opens_at?: string | null;
          closes_at?: string | null;
          is_closed?: boolean;
          note?: string | null;
        };
      };
    };
  };
};

// App-specific types
export interface MenuItem extends Database['public']['Tables']['menu_items']['Row'] {}
export interface Category extends Database['public']['Tables']['categories']['Row'] {}
export interface Review extends Database['public']['Tables']['reviews']['Row'] {}
export interface OrderPlatform extends Database['public']['Tables']['order_platforms']['Row'] {}
export interface Reservation extends Database['public']['Tables']['reservations']['Row'] {}
export interface RestaurantSettings extends Database['public']['Tables']['restaurant_settings']['Row'] {}
export interface OpeningHours extends Database['public']['Tables']['opening_hours']['Row'] {}
