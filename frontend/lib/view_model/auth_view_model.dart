import 'package:flutter/foundation.dart';
import 'package:health_care_website/enum/user_role.dart';
import 'package:health_care_website/model/user/user.dart';
import 'package:health_care_website/repo/auth_repo.dart';

class AuthViewModel with ChangeNotifier {
  User? _user;

  String get id => _user?.id ?? "";
  String get name => _user?.name ?? "";
  UserRole get role => _user?.role ?? UserRole.none;

  AuthViewModel() {
    AuthRepo.getAccessToken(cookieOnly: true).then((value) {
      AuthRepo.getUser().then((value) {
        _user = value;
        notifyListeners();
      });
    });
  }

  Future<bool> get isLoggedIn => AuthRepo.isAuthorized();

  Uri get ncuPortalOAuthUrl => AuthRepo.ncuPortalOAuthUrl;

  Future<void> login() async {
    await AuthRepo.getAccessToken();
    _user = await AuthRepo.getUser();
    notifyListeners();
  }

  void logout() async {
    AuthRepo.dropAccessToken();
    _user = null;
    notifyListeners();
  }
}
