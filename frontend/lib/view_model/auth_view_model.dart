import 'package:flutter/foundation.dart';
import 'package:health_care_website/repo/auth_repo.dart';

class AuthViewModel with ChangeNotifier {
  String? _token;

  // TODO: call api to check if the user is authenticated
  bool get isLoggedIn => _token != null;

  Uri get ncuPortalOAuthUrl => AuthRepo.ncuPortalOAuthUrl;

  Future<void> getAccessToken() async {
    _token = await AuthRepo.getAccessToken();
    notifyListeners();
  }
}
