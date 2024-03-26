def endswith_check(file_name, allow_endswith):
    for postfix in allow_endswith:
        if file_name.endswith(postfix):
            return True
    return False


def api_input_check(args, api_input):
    for arg in args:
        if arg not in api_input:
            return False
    return True


def api_input_get(args, api_input):
    res = []
    for arg in args:
        res.append(api_input[arg])
    return res
