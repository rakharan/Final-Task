package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	Name     string `json:"name" form:"name"`
	Username string `json:"username" form:"username"`
	Phone    string `json:"phone"`
	Email    string `json:"email" form:"email"`
	Password string `json:"-" form:"password"`
	Image    string `json:"image" form:"image"`
}
