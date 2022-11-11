export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "blog-comments": {
        Row: {
          id: number
          postName: string
          who: string | null
          when: string | null
          comment: string
        }
        Insert: {
          id: number
          postName: string
          who?: string | null
          when?: string | null
          comment: string
        }
        Update: {
          id?: number
          postName?: string
          who?: string | null
          when?: string | null
          comment?: string
        }
      }
      "blogpost-likes": {
        Row: {
          id: number
          postName: string
        }
        Insert: {
          id?: number
          postName: string
        }
        Update: {
          id?: number
          postName?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
