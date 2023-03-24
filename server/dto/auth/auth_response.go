package authdto

type LoginResponse struct {
	ID       int    `gorm:"type:int" json:"id"`
	Name     string `json:"name" form:"name"`
	Username string `json:"username" form:"username"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Token    string `gorm:"type: varchar(255)" json:"token"`
	Role     string `json:"role" gorm:"default:user; type:varchar(6)"`
	Image    string `json:"image"`
}

type CheckAuthResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
	Image string `json:"image"`
}
