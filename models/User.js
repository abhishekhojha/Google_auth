const UserSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    role: { type: String, enum: ['student', 'teacher', 'superadmin'], default: 'student' },
});