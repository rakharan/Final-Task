package models

import "time"

type User struct {
	ID            int       `json:"id" gorm:"primary_key"`
	Name          string    `json:"name" gorm:"type: varchar(255)"`
	Username      string    `json:"username" gorm:"type: varchar(255)"`
	Email         string    `json:"email" gorm:"type: varchar(255)"`
	Phone         string    `json:"phone"`
	Password      string    `json:"-" gorm:"type: varchar(255)"`
	Role          string    `json:"role" form:"role" gorm:"default:user; type:varchar(6)"`
	Image         string    `json:"image" form:"image" gorm:"type: varchar(255)"`
	ImagePublicID string    `json:"image_public_id"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type UsersProfileResponse struct {
	ID    int    `json:"id" gorm:"primary_key"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Phone string `json:"phone"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
