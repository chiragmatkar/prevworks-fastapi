from typing import Optional
from fastapi import Request

class UserCreateForm:
    def __init__(self,request: Request):
        self.request: Request = request
        self.email: Optional[str] = None
        self.first_name: Optional[str] = None
        self.last_name: Optional[str] = None
        self.password: Optional[str] = None

    async def load_data(self):
        form = await self.request.form
        self.email = form.get("email")
        self.first_name = form.get("first_name")
        self.last_name = form.get("last_name")
        self.password = form.get("password")
